#!/bin/sh

###############################################
# PPAGES ~ centerkey.com/ppages               #
# GPL ~ Copyright (c) individual contributors #
###############################################

# Update Web Files:
# Copies files to FTP folder

websiteFolder=$(dirname $0)
httpdConf=/private/etc/apache2/httpd.conf
webServerRoot=$(grep ^DocumentRoot $httpdConf | awk -F\" '{ print $2 }')
webServerPath=centerkey.com/ppages
ftpFolder=$webServerRoot/$webServerPath

viewWebsite() {
   echo "*** Open HTML files"
   cd $websiteFolder
   pwd
   ls -l *.html
   open logo.html
   open index.html
   echo
   }

copyToFtpFolder() {
   echo "*** Copy to FTP folder"
   cd $websiteFolder
   echo $ftpFolder
   mkdir -p $ftpFolder/graphics
   cp -v *.css *.html $ftpFolder
   cp -v graphics/*   $ftpFolder/graphics
   open http://localhost/$webServerPath
   echo
   }

echo
echo "PPAGES ~ View Project Website"
echo "============================="
echo
viewWebsite
[ -d $ftpFolder ] && copyToFtpFolder