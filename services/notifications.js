import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export async function registerForPushNotificationsAsync(){
  try{
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted'){
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted'){
      return null;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }catch(e){
    console.warn('Notifications setup failed',e);
    return null;
  }
}

export function scheduleLocalNotification(date, title, body){
  // date: JS Date
  const trigger = date;
  Notifications.scheduleNotificationAsync({
    content:{title,body},
    trigger
  });
}
