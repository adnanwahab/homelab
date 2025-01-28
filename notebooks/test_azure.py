from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

project_connection_string = "eastus2.api.azureml.ms;cbe6f2d4-396a-45e7-bb31-417d7b06f661;rg-dynabotdev-4309_ai;dynabotdev-1214"

project = AIProjectClient.from_connection_string(
    conn_str=project_connection_string, credential=DefaultAzureCredential()
)

chat = project.inference.get_chat_completions_client()
response = chat.complete(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "system",
            "content": "You are an AI assistant that speaks like a techno punk rocker from 2350. Be cool but not too cool. Ya dig?",
        },
        {"role": "user", "content": "Hey, can you help me with my taxes? I'm a freelancer."},
    ],
)

print(response.choices[0].message.content)
