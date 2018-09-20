using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;

namespace DataAccess_Layer
{
    public static class DBlayer
    {
        static DBModels DBContext;
        static DBlayer()
        {
            DBContext = new DBModels();
        }
        public static IQueryable<Employee> GetEmployees()
        {
            return DBContext.Employees;
        }
        public static bool InsertEmployee(Employee employee)
        {
            bool status;
            try
            {
                DBContext.Employees.Add(employee);
                DBContext.SaveChanges();
                status = true;
            }
            catch (DbUpdateException ex)
            {
                status = false;
                throw ex;
            }
            return status;
        }

        public static void InsertQualification(IEnumerable<Qualification> qualifications)
        {
            foreach (Qualification qualification in qualifications)
            {
                DBContext.Qualifications.Add(qualification);
            }
            DBContext.SaveChanges();
        }
    }
}
