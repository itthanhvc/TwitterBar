/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

/**
 *
 * @author utku
 */
public class TrendsFeed {
    
    private String trendLink;
    private String trendName;
    
    public TrendsFeed() {
        
    }
    
    public TrendsFeed(String tLink, String tName) {
        trendLink = tLink;
        trendName = tName;
    }

    public String getTrendLink() {
        return trendLink;
    }

    public String getTrendName() {
        return trendName;
    }
    
    
}
