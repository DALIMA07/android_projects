package com.example.photo_frame;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;

public class MainActivity extends AppCompatActivity {

    ImageButton prev, next;
    ImageView pic;
    int currentImage = 0;

    //0-1-2-3-4-5-6-7-8-0-1-2-3-4-5-6-7-8-0

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }


    public void prev(View view){

        String idX = "p" + currentImage;
        int x = this.getResources().getIdentifier(idX,"id",getPackageName());
        pic = findViewById(x);
        pic.setAlpha(0f);

        currentImage = ( currentImage - 1) % 9;
        String idY = "p" + currentImage;
        int y = this.getResources().getIdentifier(idY,"id",getPackageName());
        pic = findViewById(y);
        pic.setAlpha(1f);

    }
    public void next(View view){

        String idX = "p" + currentImage;
        int x = this.getResources().getIdentifier(idX, "id", getPackageName());
        pic = findViewById(x);
        pic.setAlpha(0f);

        currentImage = (currentImage + 1) % 9;
        String idY = "p" + currentImage;
        int y = this.getResources().getIdentifier(idY,"id",getPackageName());
        pic = findViewById(y);
        pic.setAlpha(1f);

    }
}