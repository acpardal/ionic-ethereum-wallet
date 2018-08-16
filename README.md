# ionic-ethereum-wallet
Ethereum wallet for smartphones




Building Dapp browser

Working if i add this Java code to InAppBrowser.java on InAppBrowserClient Class.
Need to make a Custom plugin for this....

        private final Object lock = new Object();
        private boolean isInjected = false;
        public WebResourceResponse shouldInterceptRequest(WebView webView, WebResourceRequest webResourceRequest) {
            if (webResourceRequest.getMethod().equalsIgnoreCase("GET") && (webResourceRequest.getUrl().toString().contains(".js") || webResourceRequest.getUrl().toString().contains("json") || webResourceRequest.getUrl().toString().contains("css"))) {
                synchronized (this.lock) {
                    if (!this.isInjected) {
                        try {
                            JSONObject obj = new JSONObject();
                            obj.put("type", LOAD_START_EVENT);
                            obj.put("url", "");
                            sendUpdate(obj, true);
                        } catch (JSONException ex) {
                            LOG.e(LOG_TAG, "URI passed in has caused a JSON error.");
                        }
                        this.isInjected = true;
                    }
                }
            }
            super.shouldInterceptRequest(webView, webResourceRequest);
            return null;
        }