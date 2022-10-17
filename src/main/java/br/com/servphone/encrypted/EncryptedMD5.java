package br.com.servphone.encrypted;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class EncryptedMD5 {

    public static String hashMd5(String value) {
        String salt = value+"nullAPeMvvClAsEwPZx";
        MessageDigest md;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        BigInteger hash = new BigInteger(1, md.digest(salt.getBytes()));
        return hash.toString(16);
    }
}
