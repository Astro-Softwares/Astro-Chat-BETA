self.addEventListener("install", event => {
    self.skipWaiting();
});


self.addEventListener("activate", event => {
    event.waitUntil(
        self.clients.claim()
    );
});


self.addEventListener(
    "notificationclick",
    event => {

        event.notification.close();

        const senderId =
            event.notification.data?.senderId;

        event.waitUntil(

            self.clients
                .matchAll({
                    type: "window",
                    includeUncontrolled: true
                })
                .then(clientList => {

                    /*
                     * If AstroChat is already open,
                     * focus it.
                     */

                    for (const client of clientList) {

                        if (
                            "focus" in client
                        ) {

                            return client.focus();

                        }

                    }

                    /*
                     * Otherwise open AstroChat.
                     */

                    if (
                        self.clients.openWindow
                    ) {

                        return self.clients.openWindow(
                            "./"
                        );

                    }

                })

        );

    }
);
