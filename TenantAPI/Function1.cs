using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using TenantAPI.Data;

namespace TenantAPI
{
    public static class Function1
    {
		[FunctionName("GetAll")]
		public static async Task<IEnumerable<Project>> Run([HttpTrigger(AuthorizationLevel.Function, "get", Route = "projects")]HttpRequest req, ILogger log)
		{
			log.LogInformation("C# HTTP trigger function to get all data from Cosmos DB");

			IDocumentDBRepository<Project> Respository = new DocumentDBRepository<Project>();
			return await Respository.GetItemsAsync("project");
		}
	}

	public static class GetSingle
	{
		[FunctionName("GetSingle")]
		public static async Task<Project> Run([HttpTrigger(AuthorizationLevel.Function, "get", Route = "project/{sponsor}/{displayName}")]HttpRequest req, ILogger log, string sponsor, string displayName)
		{
			log.LogInformation("C# HTTP trigger function to get a single data from Cosmos DB");

			IDocumentDBRepository<Project> Respository = new DocumentDBRepository<Project>();
			var Projects = await Respository.GetItemsAsync(p=> p.DisplayName == displayName, "project", displayName);
			Project Project = new Project();
			foreach (var emp in Projects)
			{
				Project = emp;
				break;
			}
			return Project;
		}
	}

	public static class CreateOrUpdate
	{
		[FunctionName("CreateOrUpdate")]
		public static async Task<bool> Run([HttpTrigger(AuthorizationLevel.Function, "post", "put", Route = "project")]HttpRequest req, ILogger log)
		{
			log.LogInformation("C# HTTP trigger function to create a record into Cosmos DB");
			try
			{
				IDocumentDBRepository<Project> Respository = new DocumentDBRepository<Project>();
				string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
				var Project = JsonConvert.DeserializeObject<Project>(requestBody);
				if (req.Method == "POST")
				{					
					await Respository.CreateItemAsync(Project, "project");
				}
				else
				{
					await Respository.UpdateItemAsync(Project.Id, Project, "project");
				}
				return true;
			}
			catch
			{
				log.LogInformation("Error occured while creating a record into Cosmos DB");
				return false;
			}

		}
	}

	public static class Delete
	{
		[FunctionName("Delete")]
		public static async Task<bool> Run([HttpTrigger(AuthorizationLevel.Function, "delete", Route = "project/{displayName}/{id}")]HttpRequest req, ILogger log, string displayName, string id)
		{
			log.LogInformation("C# HTTP trigger function to delete a record from Cosmos DB");

			IDocumentDBRepository<Project> Respository = new DocumentDBRepository<Project>();
			try
			{
				await Respository.DeleteItemAsync(id, "project", displayName);
				return true;
			}
			catch
			{
				return false;
			}
		}
	}
}
