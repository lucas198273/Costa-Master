import { Request, Response } from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: { timeout: 5000 }, // Opcional: define timeout
});

const payment = new Payment(mp);

export const createPixPayment = async (req: Request, res: Response) => {
  try {
    const { amount, description } = req.body;

    const paymentData = {
      transaction_amount: Number(amount),
      description: description,
      payment_method_id: "pix",
      payer: {
        email: "cliente@email.com",
      },
    };

    const paymentResponse = await payment.create({ body: paymentData });

    // Verificações de segurança
    if (!paymentResponse || !paymentResponse.point_of_interaction || !paymentResponse.point_of_interaction.transaction_data) {
      throw new Error("Resposta inválida do Mercado Pago: dados do PIX não encontrados");
    }

    res.json({
      qr_code: paymentResponse.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: paymentResponse.point_of_interaction.transaction_data.qr_code_base64,
      id: paymentResponse.id,
    });
  } catch (error) {
    console.error("Erro ao criar pagamento PIX:", error);
    res.status(500).json({ error: "Erro ao criar pagamento PIX" });
  }
};

export const handleWebhook = (req: Request, res: Response) => {
  const { type, data } = req.body;

  console.log('Webhook recebido:', type, data);

  res.status(200).send('OK');
};