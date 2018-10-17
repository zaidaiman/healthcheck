using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Reflection;

namespace healthcheck.Controllers
{
    [Route("api/[controller]")]
    public class AliveController : Controller
    {
        [HttpGet("[action]")]
        public JsonResult AreYouAlive(string URL)
        {
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(URL);
            HttpWebResponse response = (HttpWebResponse)req.GetResponse();
            try
            {
                var data = new ResponseModel();
                Reflection.CopyProperties(response, data);
                return Json(data);
            }
            finally
            {
                response.Close();
            }
        }
    }

    public class ResponseModel
    {
        public string CharacterSet { get; set; }
        public string ContentEncoding { get; set; }
        public long ContentLength { get; set; }
        public string ContentType { get; set; }
        public CookieCollection Cookies { get; set; }
        public WebHeaderCollection Headers { get; set; }
        public bool IsMutuallyAuthenticated { get; set; }
        public string Method { get; set; }
        public Version ProtocolVersion { get; set; }
        public Uri ResponseUri { get; set; }
        public string Server { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public string StatusDescription { get; set; }
        public bool SupportHeaders { get; set; }
        public string guid { get; set; }
        public ResponseModel() {
            guid = Guid.NewGuid().ToString();
        }
    }


    public static class Reflection
    {
        /// <summary>
        /// Extension for 'Object' that copies the properties to a destination object.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <param name="destination">The destination.</param>
        public static void CopyProperties(this object source, object destination)
        {
            // If any this null throw an exception
            if (source == null || destination == null)
                throw new Exception("Source or/and Destination Objects are null");
            // Getting the Types of the objects
            Type typeDest = destination.GetType();
            Type typeSrc = source.GetType();
            // Collect all the valid properties to map
            var results = from srcProp in typeSrc.GetProperties()
                          let targetProperty = typeDest.GetProperty(srcProp.Name)
                          where srcProp.CanRead
                          && targetProperty != null
                          && (targetProperty.GetSetMethod(true) != null && !targetProperty.GetSetMethod(true).IsPrivate)
                          && (targetProperty.GetSetMethod().Attributes & MethodAttributes.Static) == 0
                          && targetProperty.PropertyType.IsAssignableFrom(srcProp.PropertyType)
                          select new { sourceProperty = srcProp, targetProperty = targetProperty };
            //map the properties
            foreach (var props in results)
            {
                props.targetProperty.SetValue(destination, props.sourceProperty.GetValue(source, null), null);
            }
        }
    }
}
