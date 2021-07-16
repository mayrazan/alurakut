import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(request, response) {
  if (request.method === "POST") {
    const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
    const client = new SiteClient(TOKEN);

    // Validar os dados, antes de sair cadastrando
    const registroCriado = await client.items.create({
      itemType: request.itemType, // ID do Model de "Communities" criado pelo Dato
      ...request.body,
    });

    response.json({
      registroCriado: registroCriado,
    });
    return;
  }

  response.status(404).json({
    message: "Ainda não temos nada no GET, mas no POST tem!",
  });
}

// itemType: "966896"
// itemType: "971615"
