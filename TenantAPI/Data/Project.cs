using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace TenantAPI.Data
{
	public class Project
	{
		[JsonProperty(PropertyName = "id")]
		public string Id { get; set; }

		[JsonProperty(PropertyName = "displayName")]
		public string DisplayName { get; set; }

		public IList<KeyValuePair<string,string>> AlternateId { get; set; }

		[JsonProperty(PropertyName = "sponsor")]
		public string Sponsor { get; set; }
		public string SponsorStudyName { get; set; }
		public string Status { get; set; }		
	}
}
