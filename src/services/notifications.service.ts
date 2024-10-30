export interface Notification {
    title: string;
    message: string;
}

enum NotificationElement {
    NotificationRef = "notificationRef",
    NotificationTitle = "notification-title",
    NotificationMessage = "notification-message",
}

enum NotificationClass {
    Hidden = "hidden",
    NotificationAnimation = "notification-animation",
}

export class NotificationsService {
    static getElement(id: string) {
        return document.getElementById(id);
    }

    static show(notification: Notification) {
        const element = this.getElement(NotificationElement.NotificationRef);
        if (element) {
            this.writeElementById(NotificationElement.NotificationTitle, notification.title);
            this.writeElementById(NotificationElement.NotificationMessage, notification.message);

            element.classList.remove(NotificationClass.Hidden);
            element.classList.add(NotificationClass.NotificationAnimation);

            setTimeout(() => this.hide(), 3250);
        }
    }

    static hide() {
        const element = this.getElement(NotificationElement.NotificationRef);
        if (element) {
            element.classList.remove(NotificationClass.Hidden);
            element.classList.add(NotificationClass.NotificationAnimation);
        }
    }

    private static writeElementById(elementId: NotificationElement, str: string) {
        const element = this.getElement(elementId);
        if (element) {
            element.innerHTML = str;
        }
    }
}