/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package controller.api;

import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.*;
import java.net.URL;

/**
 * @author tuong
 */
@WebServlet(urlPatterns = {"/image"})
@MultipartConfig(fileSizeThreshold = 1024 * 1024,
        maxFileSize = 1024 * 1024 * 5,
        maxRequestSize = 1024 * 1024 * 5 * 5)
public class ImageAPI extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        ServletContext sc = getServletContext();

        final String pathImage = request.getParameter("path");
        InputStream is;
        try {

            if (pathImage.contains("http")) {
                is = new URL(pathImage).openStream();
            } else {
                is = sc.getResourceAsStream(pathImage);
            }
            // it is the responsibility of the container to close output stream
            OutputStream os = response.getOutputStream();

            if (is == null) {
                response.setContentType("text/plain");
                os.write("Failed to send image".getBytes());
            } else {
                response.setContentType("image/*");

                byte[] buffer = new byte[1024];
                int bytesRead;

                while ((bytesRead = is.read(buffer)) != -1) {

                    os.write(buffer, 0, bytesRead);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        // Create path components to save the file
        final String folderToSave = request.getParameter("folderToSave");
        final Part filePart = request.getPart("picture");
        final String fileName = filePart.getSubmittedFileName();

        String uploadPath = getServletContext().getRealPath("") + folderToSave;
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }

        OutputStream out = null;
        InputStream filecontent = null;
        JsonGenerator generator = null;

        try {
            out = new FileOutputStream(new File(uploadPath + File.separator
                    + fileName));
            filecontent = filePart.getInputStream();

            int read = 0;
            final byte[] bytes = new byte[1024];

            while ((read = filecontent.read(bytes)) != -1) {
                out.write(bytes, 0, read);
            }

            generator = Json.createGenerator(response.getOutputStream());
            generator.writeStartObject()
                    .write("message", "Upload thành công!")
                    .writeEnd();
        } catch (FileNotFoundException fne) {
            System.out.println("You either did not specify a file to upload or are trying to upload a file to a protected or nonexistent location.");
            fne.printStackTrace();
            generator.writeStartObject()
                    .write("message", "Upload thất bại!")
                    .writeEnd();
        } finally {
            if (out != null) {
                out.close();
            }
            if (filecontent != null) {
                filecontent.close();
            }
            if (generator != null) {
                generator.close();
            }
        }
    }
}
