export async function sendFeedback(payload) {
    console.log("📡 Pulsetracker feedback sent:", payload);
  
    // mock network delay
    await new Promise((res) => setTimeout(res, 500));
  
    return { status: "ok" };
  }
  