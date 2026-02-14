
## **Step 1: Create a Backblaze B2 Bucket**

1. Sign in to your [Backblaze B2 account](https://www.backblaze.com/b2/cloud-storage.html).
2. Go to **Buckets → Create a Bucket**.
3. Name your bucket (e.g., `my-ecommerce-images`).
4. Set **Bucket Type**:

   * `Private` → if you want controlled access (recommended for product images).
   * `Public` → if you just want anyone to access it.
5. Save the bucket.

---

## **Step 2: Upload your images**

You have multiple options:

* **Web UI**: Drag and drop images directly into the bucket.
* **B2 CLI**:

```bash
b2 authorize-account <ACCOUNT_ID> <APPLICATION_KEY>
b2 upload-file my-ecommerce-images /local/path/product1.jpg product1.jpg
```

* **API / SDK**: Use Backblaze’s SDKs to automate uploads from your FastAPI app.

---

## **Step 3: Connect your bucket to Cloudflare**

1. In Cloudflare, go to your **DNS settings** for your domain.
2. Add a **CNAME record** like:

   * Name: `cdn` (so your URL becomes `cdn.mydomain.com`)
   * Target: `<your-b2-bucket>.s3.us-west-000.backblazeb2.com`
3. Make sure **Proxy status** is `Proxied` (orange cloud) so Cloudflare acts as CDN.

> Optional: You can also use **Cloudflare Workers** for more control, such as:
>
> * Signed URL verification
> * Image resizing or compression on the fly

---

## **Step 4: Serve images via your domain**

* Example URL:

```
https://cdn.mydomain.com/product1.jpg
```

* Cloudflare caches the first request at edge locations (Canada, UK, etc.), then serves subsequent requests directly from cache.
* This reduces B2 egress and speeds up load times globally.

---

## **Step 5: Optional – Signed URLs for private content**

* If your bucket is private, you can generate signed URLs in your FastAPI app.
* Only requests with valid signatures can access the images.
* Works well for protecting high-value product images or downloads.

---

## **Step 6: Verify and monitor**

* Test your image URLs in different regions (use VPN or speed test tools).
* Monitor Cloudflare analytics to see cache hits and bandwidth savings.

---

✅ **Advantages of this setup**

* Low cost storage (B2 ~ $0.006/GB/month)
* Free Cloudflare bandwidth for your visitors
* Global CDN with caching ensures fast image delivery
* Scales easily for 100k+ visitors/day

---
