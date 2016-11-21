package beans;

import java.util.ArrayList;
import java.util.List;

public class Feed {

    private String Image;
    private String Title;
    private String Link;
    private String LinkText;

    public Feed() {
    }

    public Feed(String image, String title, String link, String linkText) {
        this.Link = link;
        this.Image = image;
        this.Title = title;
        this.LinkText = linkText;
    }

    public String getImage() {
        return this.Image;
    }

    public String getLink() {
        return this.Link;
    }

    public String getLinkText() {
        return this.LinkText;
    }

    public String getTitle() {
        return this.Title;
    }

}
