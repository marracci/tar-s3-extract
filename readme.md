**This repo provides a node.js toolset for extracting specific filetypes out of a TAR on S3**

*Created to specifically avoid having to extract all files within a TAR to access only the filetype needed*

The app will do the following:
* access s3 bucket/prefix
* locate .TARs within bucket and all subsequent prefixes
* write list of TAR object to `objects_in_bucket` file
* refer to list of objects found. then for each object:
** read TAR header
** locate .zip file
** copy only .zip file to `tmp` dir in repo
** close TAR file


First Run:

$ cd extractzip
- make sure tmp dir is clear
- make sure objects_in_bucket is cleared

$ ./extractzips

*********************************************



++ in `extractzips`, make sure to change bucket name

then run:

$ ./extractzips

++ if you change your bucket keys on AWS:
* in `extractzips` make sure to update your access and secret keys.

  then run:

  $ ./extractzips

++ to run in specific subdir of bucket:
  in `extractzips` (line7) add subfolder after `s3://${S3_BUCKET_NAME}/`

  then run:

  $ ./extractzips


++ if failure,
  capture last .zip extracted from $
  find in objects_in_bucket
  remove all lines above

  then

  in `extractzips` comment out line7 where starts with:
    `aws s3 ls --recursive s3://${S3_BUCKET_NAME}/`

    then run:

    $ ./extractzips
