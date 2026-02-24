import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

interface NominationEmailRequest {
    email: string;
    name: string;
    role: string;
    city: string;
    state: string;
    cardUrl: string;
    certificateUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { email, name, role, city, state, cardUrl, certificateUrl }: NominationEmailRequest = await req.json();

        const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000; text-align: center;">Parabéns pela Nomeação!</h1>
        <p>Olá, <strong>${name}</strong>.</p>
        <p>A Presidência da Associação Frota Brasil tem a honra de oficializar sua nomeação como <strong>${role}</strong> para a jurisdição de ${city}/${state}.</p>
        
        <p>Abaixo estão os links para download dos seus documentos oficiais:</p>
        
        <div style="margin: 20px 0; text-align: center;">
            <a href="${cardUrl}" style="background-color: #d97706; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px; display: inline-block;">
                Baixar Carteirinha
            </a>
            <a href="${certificateUrl}" style="background-color: #1e40af; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px; display: inline-block;">
                Baixar Certificado
            </a>
        </div>

        <p>Atenciosamente,<br/><strong>Associação Frota Brasil</strong></p>
      </div>
    `;

        const { data, error } = await resend.emails.send({
            from: "Associação Frota Brasil <nao-responda@frotabrasil.org.br>", // Adjust sender as needed or use onboarding@resend.dev during testing
            to: [email],
            subject: `Sua Nomeação como ${role} - Frota Brasil`,
            html: emailHtml,
        });

        if (error) {
            console.error("Error sending email:", error);
            return new Response(JSON.stringify({ error }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Error handling request:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
};

serve(handler);
