using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Library_Management_System
{
    public static class Connection
    {
        //public static SqlConnection sqlConnection;
        public static IConfiguration _config;
        public static SqlConnection GetSqlConnection()
        {
            SqlConnection sqlConnection = new SqlConnection();
            sqlConnection.ConnectionString = _config.GetConnectionString("AttendanceAppCon");
            if (sqlConnection.State == System.Data.ConnectionState.Closed)
            {
                sqlConnection.Open();
            }
            return sqlConnection;
        }
    }
}
