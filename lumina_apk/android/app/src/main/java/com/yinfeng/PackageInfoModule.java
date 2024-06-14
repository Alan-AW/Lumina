package com.LuminaOS;


import android.content.pm.PackageInfo;
import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
// import com.google.firebase.iid.FirebaseInstanceId;
import com.LuminaOS.BuildConfig;

/**
 * Created by manleung on 20/7/2017.
 */

public class PackageInfoModule extends ReactContextBaseJavaModule {
    private String TAG = "PackageInfoModule";

    public PackageInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "PackageInfoModule";
    }

    @ReactMethod
    public void getAppVersion(final Promise promise) {
        Log.d(TAG, "getVersion: ");
        promise.resolve(BuildConfig.VERSION_NAME);
    }
}
