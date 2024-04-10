using System;
using System.Data;
using System.IO;
using System.Security.Cryptography;
using System.Text;

public class AESEncryptionService
{
    public string Encrypt(EncryptionRequest data)
    {
        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = data.Key;
            aesAlg.IV = data.IV;

            using (MemoryStream msEncrypt = new MemoryStream())
            {
                using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, aesAlg.CreateEncryptor(), CryptoStreamMode.Write))
                {
                    using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                    {
                        swEncrypt.Write(data);
                    }
                }
                return Convert.ToBase64String(msEncrypt.ToArray());
            }
        }
    }

    public string Decrypt(EncryptionRequest data)
    {
        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = data.Key;
            aesAlg.IV = data.IV;
            aesAlg.Padding = PaddingMode.PKCS7; // Set the padding mode explicitly.

            using (MemoryStream msDecrypt = new MemoryStream(Convert.FromBase64String(data.Text)))
            {
                using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, aesAlg.CreateDecryptor(), CryptoStreamMode.Read))
                {
                    using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                    {
                        return srDecrypt.ReadToEnd();
                    }
                }
            }
        }
    }

    public class EncryptionRequest
    {
        public string Text { get; set; }
        public byte[] Key { get; set; }
        public byte[] IV { get; set; }
    }
}
