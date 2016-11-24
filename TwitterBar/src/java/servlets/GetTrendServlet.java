/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import beans.TrendsFeed;
import com.google.gson.Gson;
import helpers.RequestHelper;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import twitter4j.GeoLocation;
import twitter4j.Trend;
import twitter4j.Trends;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

/**
 *
 * @author utku
 */
public class GetTrendServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        ConfigurationBuilder cb = RequestHelper.configTwitter();
        String strLat = req.getParameter("latitude");
        String strLong = req.getParameter("longitude"); 
        double longitude = Double.parseDouble(strLong);
        double latitude = Double.parseDouble(strLat);
        //String strWoeid = RequestHelper.GetParameter(req, "woeid").toString();
        //int woeid = Integer.parseInt(strWoeid);
        resp.setContentType("application/json");
        out.print(new Gson().toJson(getTrends(cb, longitude, latitude)));
        out.flush();
    }
    
    private List<TrendsFeed> getTrends(ConfigurationBuilder cb, double longitude, double latitude) {
        Twitter twitter = new TwitterFactory(cb.build()).getInstance();
        Trends trends = null;
        List<TrendsFeed> list = new ArrayList<TrendsFeed>();
        
        try {
            
            GeoLocation gl = new GeoLocation(latitude, longitude);
            int woeid = twitter.getClosestTrends(gl).get(0).getWoeid();
            System.out.println("WOEID: " + woeid);
            trends = twitter.getPlaceTrends(woeid);
            for(int i = 0; i < 5; i++){
                String name = trends.getTrends()[i].getName();
                String link = trends.getTrends()[i].getURL();
                TrendsFeed f = new TrendsFeed(link, name);
                list.add(f);
            }
            
        } catch (TwitterException ex) {
            Logger.getLogger(GetTrendServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return list;
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
