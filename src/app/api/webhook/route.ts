import { db } from "@/db"
import { agents, meetings } from "@/db/schema"
import { inngest } from "@/inngest/client"
import { streamVideo } from "@/lib/stream-video"
import { UpdateAgentDialog } from "@/modules/agents/ui/components/update-agent-dialog"
import { CallEndedEvent, MessageNewEvent, CallTranscriptionReadyEvent, CallSessionParticipantLeftEvent, CallSessionStartedEvent, CallRecordingReadyEvent } from "@stream-io/node-sdk"
import { Verify } from "crypto"
import { and, eq, not } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"



function verifySignatureWithSdk(body: string, signature: string): boolean {
    return streamVideo.verifyWebhook(body, signature)
}


export async function POST(req: NextRequest) {
    const signature = req.headers.get("x-signature");
    const apikey = req.headers.get("x-api-key")


    if (!signature || !apikey) {
        return NextResponse.json({ error: "Missing signature or API key" }, { status: 400 })
    }


    const body = await req.text();

    if (!verifySignatureWithSdk(body, signature)) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }


    let payload: unknown;
    try {
        payload = JSON.parse(body) as Record<string, unknown>;
    } catch (error) {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }


    const eventType = (payload as Record<string, unknown>)?.type;
    if (eventType === "call.session.started") {
        const event = payload as CallSessionStartedEvent;
        const meetingId = event.call.custom?.meetingId;

        if (!meetingId) {
            return NextResponse.json({ error: "Missing meetingid", }, { status: 400 })
        }


        const [existingMeeting] = await db.select().from(meetings).where(and(eq(meetings.id, meetingId), not(eq(meetings.status, "completed")), not(eq(meetings.status, "active")), not(eq(meetings.status, "cancelled")), not(eq(meetings.status, "processing"))));


        if (!existingMeeting) {
            return NextResponse.json({ error: "Meeting not found" }, { status: 404 })
        }
        await db.update(meetings).set({ status: "active", startedAt: new Date() }).where(eq(meetings.id, existingMeeting.id));


        const [existingAgent] = await db.select().from(agents).where(eq(agents.id, existingMeeting.agentId));


        if (!existingAgent) {
            return NextResponse.json({ error: "Agent fotn found" }, { status: 404 })
        }


        const call = streamVideo.video.call("default", meetingId);
        const realTimeClient = await streamVideo.video.connectOpenAi({ call, openAiApiKey: process.env.OPEN_AI_KEY!, agentUserId: existingAgent.id });


        realTimeClient.updateSession({ instructions: existingAgent.instructions })
    } else if (eventType === "call.session_participend_lef") {
        const event = payload as CallSessionParticipantLeftEvent;

        const meetingId = event.call_cid.split(":")[0];

        if (!meetingId) {
            return NextResponse.json({ error: "Meeting meetingid" }, { status: 400 })
        };
        const call = streamVideo.video.call("default", meetingId);
        await call.end()
    }

    else if (eventType === "call.session_ended") {
    
    const event = payload as CallEndedEvent;
        const meetingId = event.call.custom?.meetingId;

        if (!meetingId) {
            return NextResponse.json({ error: "Missing meetingid" }, { status: 400 })
        }

        await db.update(meetings).set({ status: "processing", endedAt: new Date() }).where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")));


    }else if (eventType === "call.transcription_ready") {
        const event = payload as CallTranscriptionReadyEvent;
        const meetingId = event.call_cid.split(":")[0];

       const [updateMeeting] = await db.update(meetings)
            .set({  transcriptUrl: event.call_transcription.url })
            .where(eq(meetings.id, meetingId))
            .returning();


            if(!updateMeeting){
    return NextResponse.json({ error: "Meeting not found" }, { status: 404 })
            }

            

           await  inngest.send({name:"meetings/processing", data:{

            transcriptUrl:updateMeeting.transcriptUrl, 
            meetingId:updateMeeting.id, 
           }})
        }else if(eventType === "call.recording_ready") {

            
    const event = payload as CallEndedEvent;
        const meetingId = event.call.custom?.meetingId;

        if (!meetingId) {
            return NextResponse.json({ error: "Missing meetingid" }, { status: 400 })
        }

        await db.update(meetings).set({ status: "processing", endedAt: new Date() }).where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")));


    }else if (eventType === "call.transcription_ready") {
        const event = payload as CallRecordingReadyEvent;
        const meetingId = event.call_cid.split(":")[0];

       await db.update(meetings)
            .set({  transcriptUrl: event.call_recording.url })
            .where(eq(meetings.id, meetingId))
        
    }


    return NextResponse.json({ status: "ok" })
}