# Example of environmental variables. You should set them for each environment
# that you plan on using. For example, in a addition to DEV_PUBLISH_SMTH you
# shoud might want TEST_PUBLISH_SMTH and PROD_PUBLISH_SMTH as well.
# On Ubuntu, you can also use the .pam_environment, but you will need to strip
# the "export" if you do so.
export DEV_PUBLISH_COOKIE_SECRET=someLongHash
export DEV_PUBLISH_GOOGLE_CLIENT_ID=someLongHash
export DEV_PUBLISH_GOOGLE_CLIENT_SECRET=someLongHash
export DEV_PUBLISH_MONGO_CONN_STRING=mongodb://localhost:27017/publish
export DEV_PUBLISH_MYSQL_DB=MyPublishDBName
export DEV_PUBLISH_MYSQL_HOST=localhost
export DEV_PUBLISH_MYSQL_PASS=MyPublishDBPass
export DEV_PUBLISH_MYSQL_USER=MyPublishDBUser
export DEV_PUBLISH_MYSQL_MAX_CONN=10
export DEV_PUBLISH_NODE_HOST=127.0.0.1
export DEV_PUBLISH_NODE_PORT=3000
export DEV_PUBLISH_REDIS_SECRET=someLongHash
export DEV_PUBLISH_ROOT_PATH=/full/path/to/project/
export DEV_PUBLISH_ROOT_URL=http://127.0.0.1/
export DEV_PUBLISH_SITE_OWNERS=someone@email.com,someoneelse@email.com
