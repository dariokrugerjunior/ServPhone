package br.com.servphone.encrypted;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.util.Base64;

public class EncryptedBase64 {

    private static MessageDigest md;

    public String encode_base64(String password) {
        try {
            return Base64.getEncoder().encodeToString(password.getBytes("utf-8"));
        } catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    public String decode_base64(String hash) {
        byte[] asBytes = Base64.getDecoder().decode(hash);
        try {
            return new String(asBytes, "utf-8");
        } catch (UnsupportedEncodingException ex) {
            ex.printStackTrace();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
