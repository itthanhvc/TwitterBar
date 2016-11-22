/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import beans.Feed;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import twitter4j.JSONArray;
import twitter4j.JSONException;

import twitter4j.JSONObject;
import twitter4j.Query;
import twitter4j.QueryResult;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.User;
import twitter4j.conf.ConfigurationBuilder;

/**
 *
 * @author utku
 */
public class GetTweetsServlet extends HttpServlet {

    public static final String CONSUMER_KEY = "0G9Q20NCuK1hIWjYvdEBbGaEl";
    public static final String CONSUMER_SECRET = "x3nx3SjYT6hdJBx1dcRFVxhBePbAl2CDIyO9xyHZi3kSgmtLqG";
    public static final String ACCESS_KEY = "995074657-miNaA7Vqofi7FInIdg8DOXboNjwdP1Kap4Wfm3vP";
    public static final String ACCESS_SECRET = "GRRuPiSvc4eg3uBQbn2htYbkJo4p3FK0zUgOdciuKdQIt";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        String topic = req.getParameter("topic");
        System.out.println(topic);
        ConfigurationBuilder cb = configTwitter();
//        JSONArray tweetInfos = searchTopic(cb, topic);
        
        resp.setContentType("application/json");
        out.print(new Gson().toJson(searchTopic(cb, topic)));
        out.flush();
    }

    private ConfigurationBuilder configTwitter() {
        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setDebugEnabled(true)
                .setOAuthConsumerKey(CONSUMER_KEY)
                .setOAuthConsumerSecret(CONSUMER_SECRET)
                .setOAuthAccessToken(ACCESS_KEY)
                .setOAuthAccessTokenSecret(ACCESS_SECRET);
        return cb;
    }

    private List<Feed> searchTopic(ConfigurationBuilder cb, String topic) {

        Twitter twitter = new TwitterFactory(cb.build()).getInstance();
        Query query = new Query("#" + topic);
        QueryResult qr;
        //JSONArray tweetArray = new JSONArray();
        List<Feed> feeds = new ArrayList<>();
        try {
            qr = twitter.search(query);
            List<Status> listT = qr.getTweets();
            for (int i = 0; i < 8; i++) {

//                JSONObject tweetInfo = new JSONObject();
                Status s = listT.get(i);
                User u = (User) s.getUser();;
                String userName = u.getName();

                String text = s.getText();
                String tweetUrl = "https://twitter.com/" + u.getScreenName()
                        + "/status/" + s.getId();
                String imageUrl = u.getProfileImageURL();
                Feed feed = new Feed(imageUrl, userName, tweetUrl, text);
                feeds.add(feed);
            }
        } catch (TwitterException ex) {
            Logger.getLogger(GetTweetsServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        return feeds ;//tweetArray;
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
