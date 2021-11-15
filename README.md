# Raspberry Pi slide show kiosk setup
* notes
    * a video.jpg needs to be in your image folder to display the weather widget. 
    * to stop services enter 
        > sudo systemctl stop kiosk.service

        > sudo systemctl stop slide_project.service

        these services will restart on reboot.


## step 1. Update raspberrypi

> sudo apt update  

> sudo apt full-upgrade

## step 2. Rclone Setup in Terminal 

* step 2.1 Install unzip 
    ---------------------------------------------
    > sudo apt install unzip
    
* step 2.2 Download Rclone file
    ---------------------------------------------
    > wget https://downloads.rclone.org/rclone-current-linux-arm.zip

* step 2.3 Unzip Rclone
    ---------------------------------------------
    > unzip -j -d rclone-temp rclone-current-linux-arm.zip

* step 2.4 Move Rclone
    ---------------------------------------------
    > sudo mv ~/rclone-temp/rclone /usr/bin/rclone

* step 2.5 Move manual pages 
    ---------------------------------------------
    > sudo mv ~/rclone-temp/rclone.1 /usr/share/man/man1/rclone.1

* step 2.6 Make root user the file owner
    ---------------------------------------------
    > sudo chown root: /usr/bin/rclone

* step 2.7 Clean up
   ---------------------------------------------
    > rm ~/rclone-current-linux-arm.zip

    > rm -r -f ~/rclone-temp

* step 2.8 Set up the remote connection
    ---------------------------------------------
    * step 2.8.1 configure Rclone
      > rclone config
      
    * step 2.8.2 follow step to configure connection
       ---------------------------------------------
	    * Select 'n' and press enter
	    * Name your remote connection press enter (!remember the name).
	    * Select your service based on the numbers provided. 
	    * Follow steps that on screen to finsh this section of setup.
  
## step 3 Setting up raspberry pi for kiosk mode

* step 3.1 Install xdotool and unzip
    ---------------------------------------------
    > sudo apt-get install xdotool unclutter sed

    > sudo apt install unzip

* step 3.2 Enable auto login
    ---------------------------------------------
    > sudo raspi-config
    
    * follow this path - System Options -> Boot/Auto Login -> Desktop Autologin
    * Finish

* step 3.3 Make changes to kiosk.sh
    ---------------------------------------------
    * Open kiosk.sh in text editor
    * Change _NAME_OF_RCLONE_YOU_SET_UP_ to the name of your remote service you setup.
    * Change _FOLDER_IN_CLOUD_WITH_PICTURES_ to the folder in your remote service where your pictures are located.
    * Change _TIME_IN_SECONDS_YOU_WANT_THE_APP_TO_UPDATE_ to the the time you want to refresh the kiosk.(For example 1 day = 86400)
    * Save changes
   
* step 3.4 Move kiosk.sh to home directory
    ---------------------------------------------
    * In the terminal. In the downloaded repository directory enter these commands
	> mv kiosk.sh /home/pi

    > mv slideshow_app /home/pi

    > mv kiosk.service /lib/systemd/system

    > mv slide_project.service /lib/systemd/system	    

* step 3.5 Enable kiosk and slide_project services
    ---------------------------------------------
    sudo systemctl enable kiosk.service 
    sudo systemctl enable slide_project.service

## step 4 Restart Raspberry Pi


