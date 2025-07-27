const Notification = ({ notification, setNotification }) => {
    if (!(notification.message && notification.className)) return null;
    setTimeout(() => {
        setNotification({
            className: "",
            message: "",
        });
    }, 5000);

    return <div className={notification.className}>{notification.message}</div>;
};

export default Notification;
