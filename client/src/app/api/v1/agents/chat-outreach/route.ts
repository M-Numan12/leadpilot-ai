import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const leadId = body.lead_id || 'lead_demo';
    const message = body.message || 'Hello!';

    const replies = [
      "Hello! LeadPilot AI Outreach Agent here. I reviewed your company profile and logged your interaction in our CRM database.",
      "Greetings! We have automated your prospecting pipeline. Would you like to schedule a 15-minute live AI strategy session?",
      "Hi there! Our AI agent updated your lead status to 'Contacted' in our CRM database and assigned a senior account executive."
    ];
    const aiResponse = replies[Math.floor(Math.random() * replies.length)];

    return NextResponse.json({
      success: true,
      lead_id: leadId,
      user_message: message,
      ai_response: aiResponse,
      updated_crm_stage: 'contacted',
      updated_score: 88
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Outreach failed' }, { status: 500 });
  }
}
