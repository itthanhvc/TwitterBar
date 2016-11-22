package helpers;


import java.io.BufferedReader;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import servlets.GetTweetsServlet;
import twitter4j.JSONException;
import twitter4j.JSONObject;
import twitter4j.conf.ConfigurationBuilder;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author ThanhVan
 */
public class RequestHelper {
    
    private static final String CONSUMER_KEY = "0G9Q20NCuK1hIWjYvdEBbGaEl";
    private static final String CONSUMER_SECRET = "x3nx3SjYT6hdJBx1dcRFVxhBePbAl2CDIyO9xyHZi3kSgmtLqG";
    private static final String ACCESS_KEY = "995074657-miNaA7Vqofi7FInIdg8DOXboNjwdP1Kap4Wfm3vP";
    private static final String ACCESS_SECRET = "GRRuPiSvc4eg3uBQbn2htYbkJo4p3FK0zUgOdciuKdQIt";
    
    public static Object GetParameter(HttpServletRequest req, String key) throws IOException{
         StringBuilder sb = new StringBuilder();
        BufferedReader br = req.getReader();
        String str = null;
        while ((str = br.readLine()) != null) {
            sb.append(str);
        }
        JSONObject jObj = null; 
        Object result = null;
        try {
            jObj = new JSONObject(sb.toString());
           result = jObj.get(key);
        } catch (JSONException ex) {
            Logger.getLogger(GetTweetsServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
         return result;
    }
    
    public static ConfigurationBuilder configTwitter() {
        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setDebugEnabled(true)
                .setOAuthConsumerKey(CONSUMER_KEY)
                .setOAuthConsumerSecret(CONSUMER_SECRET)
                .setOAuthAccessToken(ACCESS_KEY)
                .setOAuthAccessTokenSecret(ACCESS_SECRET);
        return cb;
    }
}
