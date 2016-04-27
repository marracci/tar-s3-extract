First run:

$ cd extractzip
- make sure tmp dir is clear
- make sure objects_in_bucket is cleared

$ ./extractzips

*********************************************



++ in `extractzips`, make sure to change bucket name

then run:

$ ./extractzips

++ if you change your bucket keys:
  in `extractzips` make sure to change keys.

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
