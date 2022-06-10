/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package listener;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import java.io.InputStream;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 *
 * @author tuong
 */
public class InitializeFirebaseListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent event) {
        System.out.println("bat dau init firebase");
        // This will be invoked as part of a warmup request, or
        // the first user request if no warmup request was invoked.
        ServletContext sc = event.getServletContext();
        // Fetch the service account key JSON file contents
        InputStream serviceAccount = sc.getResourceAsStream("/WEB-INF/serviceAccount.json");

        try {
            // Initialize the app with a service account, granting admin privileges
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    // The database URL depends on the location of the database
                    //                .setDatabaseUrl("https://DATABASE_NAME.firebaseio.com")
                    .build();
            FirebaseApp.initializeApp(options);
            System.out.println("da init");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("init firebase loi");
        }

    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {
        // App Engine does not currently invoke this method.
    }
}
