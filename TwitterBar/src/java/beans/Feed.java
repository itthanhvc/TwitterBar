package beans;

import java.util.ArrayList;
import java.util.List;

public class Feed {

    private String imageUrl;
    private String userName;
    private String tweetUrl;
    private String text;

    public Feed() {
    }

    public Feed(String image, String userName, String tweetUrl, String text) {
        this.tweetUrl = tweetUrl;
        this.imageUrl = image;
        this.userName = userName;
        this.text = text;
    }

    public String getImage() {
        return this.imageUrl;
    }

    public String getLink() {
        return this.tweetUrl;
    }

    public String getLinkText() {
        return this.text;
    }

    public String getTitle() {
        return this.userName;
    }

}
