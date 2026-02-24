import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { fileBase64, contentType } = await req.json()
        const apiKey = Deno.env.get('GEMINI_API_KEY')

        if (!apiKey) {
            throw new Error('GEMINI_API_KEY not set')
        }

        // Gemini 1.5 Pro API URL
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`

        const prompt = `Você é um advogado especialista em trânsito no Brasil. Analise esta imagem/PDF de uma notificação de autuação e extraia os dados técnicos. 
    Retorne APENAS um objeto JSON válido (sem markdown, sem blocos de código) no formato:
    {
      "auto": "Número do auto",
      "orgao": "Órgão autuador",
      "data": "YYYY-MM-DD",
      "codigo": "Código da infração completo",
      "local": "Local da infração",
      "pontos": 4,
      "resumo_ia": "Análise curta das possíveis teses de defesa.",
      "chance_sucesso": 75
    }`

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: prompt },
                        {
                            inline_data: {
                                mime_type: contentType || 'image/jpeg',
                                data: fileBase64
                            }
                        }
                    ]
                }],
                generationConfig: {
                    response_mime_type: "application/json"
                }
            })
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.error?.message || 'Erro na API do Gemini')
        }

        const content = result.candidates[0].content.parts[0].text

        return new Response(content, {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
