import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔑 PUT YOUR VALUES HERE
const supabaseUrl = "https://dmoyeecnlwzbecgzcwlh.supabase.co"
const supabaseKey = "sb_publishable_EJLxYZkbnitIApo9OCC6PA_QOf4C9_4"

const supabase = createClient(supabaseUrl, supabaseKey)


// 📊 LOAD APPLICATIONS
async function loadApplications() {
  const { data, error } = await supabase
    .from("applyFunding")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return
  }

  const table = document.querySelector("#applicationsTable tbody")
  table.innerHTML = ""

  data.forEach(app => {
    const row = `
      <tr>
        <td>${app.business_name}</td>
        <td>${app.email}</td>
        <td>${app.sector}</td>
        <td>R ${app.required_funding}</td>
        <td>${app.Status}</td>
      </tr>
    `
    table.innerHTML += row
  })
}


// 📩 LOAD MESSAGES
async function loadMessages() {
  const { data, error } = await supabase
    .from("contact_message")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return
  }

  const table = document.querySelector("#messagesTable tbody")
  table.innerHTML = ""

  data.forEach(msg => {
    const row = `
      <tr>
        <td>${msg.name}</td>
        <td>${msg.email}</td>
        <td>${msg.message}</td>
      </tr>
    `
    table.innerHTML += row
  })
}


// 🚀 LOAD EVERYTHING
loadApplications()
loadMessages()