import React from 'react';

interface Notification {
  title: string;
  message: string;
  isRead?: boolean;
}

interface ProviderNotificationProps {
  notifications: Notification[];
  onClear: () => void;
}

const ProviderNotificationComponent: React.FC<ProviderNotificationProps> = ({ notifications, onClear }) => {
  return (
    <div>
      <h3>Provider Notifications</h3>

      <button onClick={onClear}>Clear Notifications</button>

      <div>
        <h4>Notifications:</h4>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index}>
              <strong>{notification.title}</strong>
              <p>{notification.message}</p>
            </div>
          ))
        ) : (
          <p>No notifications yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProviderNotificationComponent;
