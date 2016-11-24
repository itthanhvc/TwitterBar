/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import beans.Feed;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import helpers.RequestHelper;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.Json;
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

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        String topic = req.getParameter("topic");
        System.out.println(topic);
        ConfigurationBuilder cb = RequestHelper.configTwitter();

        resp.setContentType("application/json");
        List<Feed> list = searchTopic(cb, topic);
        out.print(new Gson().toJson(list));
        out.flush();
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
        return feeds;//tweetArray;
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
