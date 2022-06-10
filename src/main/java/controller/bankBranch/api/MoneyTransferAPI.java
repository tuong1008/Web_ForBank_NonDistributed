/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller.bankBranch.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import model.GD_ChuyenTien;
import model.User;
import service.IMoneyTransferService;
import utils.HttpUtil;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import model.UserAccount;
import service.IUserAccountService;

/**
 * @author Tuong
 */
@WebServlet(urlPatterns = {"/api-money-tranfer"})
public class MoneyTransferAPI extends HttpServlet {

    @Inject
    IMoneyTransferService moneyTransferService;
    @Inject
    IUserAccountService userAccountService;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        List<GD_ChuyenTien> accs = moneyTransferService.getAll(req);
        mapper.writeValue(resp.getOutputStream(), accs);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json");
        GD_ChuyenTien trans = HttpUtil.of(req.getReader()).toModel(GD_ChuyenTien.class);
        trans.setMaNV(((User) req.getSession().getAttribute("userInfo")).getUserName());
        String messageAfterInsert = moneyTransferService.insertMoneyTransfer(req, trans);
        UserAccount userReceiveMoney = userAccountService.getOneBySTK(req, trans.getSoTK_Nhan());
        JsonGenerator generator = Json.createGenerator(resp.getOutputStream());
        if (messageAfterInsert == null) {
            messageAfterInsert = "Thêm thành công!";

// This registration token comes from the client FCM SDKs.
//            String registrationToken = "dksCnqRlS660t3Kk3BO7gv:APA91bFVkcek2pHr7bD33Ro5LhtABHW-OgM0d8WXybu0KeF2UfcCZkZLXi8eLRESum7u8g2VJGgx9X9R_9aNuu2M_myQbN8ztIOX3A73BiuF0Jca_VofOvDwK5qfcP0kpNz7_p9tYyXe";
    String registrationToken = userReceiveMoney.getFirebaseToken();


// See documentation on defining a message payload.
            Message message = Message.builder()
                    .setNotification(Notification.builder()
                            .setTitle(trans.getSoTK_Chuyen() + " vừa chuyển tiền cho bạn!")
                            .setBody(trans.getSoTien().toString() + "VND")
                            .build())
                    .setToken(registrationToken)
                    .build();

// Send a message to the device corresponding to the provided
// registration token.
            String response = "push notification fail";
            try {
                response = FirebaseMessaging.getInstance().send(message);
            } catch (FirebaseMessagingException ex) {
                ex.printStackTrace();
            }
// Response is a message ID string.
            System.out.println("Successfully sent message: " + response);
        }
        generator.writeStartObject()
                .write("message", messageAfterInsert)
                .writeEnd();
        generator.close();
    }
}
