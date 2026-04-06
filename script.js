import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔑 REPLACE THESE WITH YOUR SUPABASE DETAILS
const supabaseUrl = "https://dmoyeecnlwzbecgzcwlh.supabase.co"
const supabaseKey = "sb_publishable_EJLxYZkbnitIApo9OCC6PA_QOf4C9_4"

const supabase = createClient(supabaseUrl, supabaseKey)


// 🎞 SLIDER 1 (your original)
let slides = document.querySelectorAll(".slide")
let index = 0

function showSlide(){
  slides.forEach(s => s.classList.remove("active"))
  if (slides.length > 0) {
    slides[index].classList.add("active")
    index = (index + 1) % slides.length
  }
}

setInterval(showSlide, 4000)


// 🎞 HERO SLIDER (your original)
let heroSlides = document.querySelectorAll(".hero-slide")
let heroIndex = 0

setInterval(function(){
  heroSlides.forEach(slide => slide.classList.remove("active"))

  if (heroSlides.length > 0) {
    heroSlides[heroIndex].classList.add("active")
    heroIndex = (heroIndex + 1) % heroSlides.length
  }
}, 5000)


// 🚀 FUNDING FORM
const fundingForm = document.getElementById("fundingForm")

if (fundingForm) {
  fundingForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const data = {
      business_name: document.getElementById("businessName").value,
      registration_number: document.getElementById("registrationNumber").value,
      email: document.getElementById("email").value,
      contact_number: document.getElementById("contactNumber").value,
      sector: document.getElementById("sector").value,
      required_funding: document.getElementById("requiredFunding").value
    }

    const { error } = await supabase.from("applyFunding").insert([data])

    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Application submitted successfully!")
      fundingForm.reset()
    }
  })
}


// 📩 CONTACT FORM
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("contactEmail").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value
    }

    const { error } = await supabase.from("contact_message").insert([data])

    if (error) {
      alert("Message failed")
    } else {
      alert("Message sent!")
      contactForm.reset()
    }
  })
}


// 📊 FUNDING CALCULATOR
window.calculateFunding = function () {
  let revenue = document.getElementById("revenue").value
  let expenses = document.getElementById("expenses").value
  let years = document.getElementById("years").value

  let profit = revenue - expenses
  let funding = profit * 6

  if (years < 1) {
    document.getElementById("result").innerHTML =
      "Business must operate for at least 1 year"
    return
  }

  document.getElementById("result").innerHTML =
    "Estimated Funding Eligibility: R " + funding
}


// 📱 MOBILE MENU (if you have it in HTML)
let toggle = document.getElementById("menu-toggle")
let nav = document.getElementById("nav-menu")

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active")
  })
}