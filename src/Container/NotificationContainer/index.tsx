import React, { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { toast } from 'react-toastify';
import ProviderNotificationComponent from '../../Component/Notification';

interface Notification {
  title: string;
  message: string;
  isRead?: boolean;
}

const ProviderNotificationContainer: React.FC = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [providerId, setProviderId] = useState<string | null>(null);

  const HUBURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      setProviderId(id);
    } else {
      console.error('Provider ID not found in localStorage.');
    }
  }, []);

  useEffect(() => {
    if (!providerId) {
      return;
    }

    const createConnection = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl(HUBURL, {
          withCredentials: true,
        })
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);

      try {
        await newConnection.start();
        console.log('SignalR Connection Established');

        await newConnection.invoke('joinProviderGroup', providerId);
        console.log('Joined provider group:', providerId);
      } catch (error) {
        console.error('Error connecting to SignalR:', error);
      }

      newConnection.on('RecieveMessage', (title: string, message: string) => {
        console.log('Received Notification:', title, message);
        setNotifications((prev) => [
          ...prev,
          { title, message, isRead: false },
        ]);
        toast.info(`${title}: ${message}`, { position: 'top-right', autoClose: 5000 });
      });
    };

    createConnection();

    return () => {
      if (connection) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        connection.stop().catch((error: any) => console.error('Error stopping connection:', error));
      }
    };
  }, [providerId]);

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <ProviderNotificationComponent
      notifications={notifications}
      onClear={handleClearNotifications}
    />
  );
};

export default ProviderNotificationContainer;
