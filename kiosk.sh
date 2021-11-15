#!/bin/bash
xset s noblank
xset s off
xset -dpms

unclutter -idle 0.5 -root &

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

/usr/bin/chromium-browser --noerrdialogs --disable-infobars --kiosk http://127.0.0.1:5000 &

while true; do
	rclone sync NAME_OF_RCLONE_YOU_SET_UP:FOLDER_IN_CLOUD_WITH_PICTURES /home/pi/slideshow_app/static/images
	xdotool keydown ctrl+r; xdotool keyup ctrl+r;
	sleep TIME_IN_SECONDS_YOU_WANT_THE_APP_TO_UPDATE
done
