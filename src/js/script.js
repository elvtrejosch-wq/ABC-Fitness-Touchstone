function subscribe() {
    alert("Thank you for subscribing!");
}// Subscribe Feature
 function subscribe() {
   const emailInput = document.getElementById("subscribeEmail");
   const errorEl = document.getElementById("subscribeError");

   if (!emailInput || !errorEl) return; // if not on a page with subscribe

   const email = emailInput.value.trim();

   // Simple validation
   if (email === "") {
     errorEl.textContent = "Please enter your email.";
     return;
   }
   if (!email.includes("@") || !email.includes(".")) {
     errorEl.textContent = "Please enter a valid email address.";
     return;
   }

   errorEl.textContent = "";
   alert("Thank you for subscribing!");
   emailInput.value = "";
 }

 // Hook the button (works on all pages that have it)
 document.addEventListener("DOMContentLoaded", () => {
   const btn = document.getElementById("subscribeBtn");
   if (btn) btn.addEventListener("click", subscribe);
 });// -------------------------
    // SHOPPING CART (sessionStorage)
    // -------------------------
    const CART_KEY = "abc_cart_items";
    const ORDER_KEY = "abc_order_processed";

    function getCart() {
      const raw = sessionStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    }

    function saveCart(cart) {
      sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function addToCart(item) {
      const cart = getCart();
      cart.push(item);
      saveCart(cart);
      alert(item.name + " added to cart!");
    }

    function openCartModal() {
      const modal = document.getElementById("cartModal");
      const cartItemsDiv = document.getElementById("cartItems");
      if (!modal || !cartItemsDiv) return;

      const cart = getCart();
      cartItemsDiv.innerHTML = "";

      if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
      } else {
        cart.forEach((item, index) => {
          const p = document.createElement("p");
          p.textContent = `${index + 1}. ${item.name} - $${item.price}`;
          cartItemsDiv.appendChild(p);
        });
      }

      modal.style.display = "block";
      modal.setAttribute("aria-hidden", "false");
    }

    function closeCartModal() {
      const modal = document.getElementById("cartModal");
      if (!modal) return;
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }

    function clearCart() {
      sessionStorage.removeItem(CART_KEY);
      alert("Cart is cleared!");
      openCartModal(); // refresh the cart display
    }

    function processOrder() {
      const alreadyProcessed = sessionStorage.getItem(ORDER_KEY);

      if (alreadyProcessed === "true") {
        alert("Order already processed!");
        return;
      }

      const cart = getCart();
      if (cart.length === 0) {
        alert("Your cart is empty. Add items before processing.");
        return;
      }

      sessionStorage.setItem(ORDER_KEY, "true");
      alert("Thank you for your order!");
    }

    // Hook Gallery page buttons
    document.addEventListener("DOMContentLoaded", () => {
      // Add-to-cart buttons
      const addButtons = document.querySelectorAll(".addBtn");
      addButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          const item = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: Number(btn.dataset.price)
          };
          addToCart(item);
        });
      });

      // View cart
      const viewBtn = document.getElementById("viewCartBtn");
      if (viewBtn) viewBtn.addEventListener("click", openCartModal);

      // Close modal
      const closeBtn = document.getElementById("closeCartBtn");
      if (closeBtn) closeBtn.addEventListener("click", closeCartModal);

      // Clear cart
      const clearBtn = document.getElementById("clearCartBtn");
      if (clearBtn) clearBtn.addEventListener("click", clearCart);

      // Process order
      const processBtn = document.getElementById("processOrderBtn");
      if (processBtn) processBtn.addEventListener("click", processOrder);

      // Close modal if clicking outside content
      const modal = document.getElementById("cartModal");
      if (modal) {
        modal.addEventListener("click", (e) => {
          if (e.target === modal) closeCartModal();
        });
      }
    });// -------------------------
       // CONTACT FORM (localStorage)
       // -------------------------
       const CONTACT_KEY = "abc_contact_messages";

       function isValidEmail(email) {
         const e = email.trim();
         return e.includes("@") && e.includes(".");
       }

       function saveContactToLocalStorage(contactObj) {
         const raw = localStorage.getItem(CONTACT_KEY);
         const arr = raw ? JSON.parse(raw) : [];
         arr.push(contactObj);
         localStorage.setItem(CONTACT_KEY, JSON.stringify(arr));
       }

       document.addEventListener("DOMContentLoaded", () => {
         const form = document.getElementById("contactForm");
         if (!form) return; // only run on About page

         const nameInput = document.getElementById("fullName");
         const emailInput = document.getElementById("email");
         const phoneInput = document.getElementById("phone");
         const messageInput = document.getElementById("message");
         const customCheckbox = document.getElementById("customRequest");

         const nameError = document.getElementById("nameError");
         const emailError = document.getElementById("emailError");
         const messageError = document.getElementById("messageError");

         const clearBtn = document.getElementById("clearContactBtn");

         function clearErrors() {
           nameError.textContent = "";
           emailError.textContent = "";
           messageError.textContent = "";
         }

         clearBtn.addEventListener("click", () => {
           form.reset();
           clearErrors();
         });

         form.addEventListener("submit", (e) => {
           e.preventDefault();
           clearErrors();

           let ok = true;

           const nameVal = nameInput.value.trim();
           const emailVal = emailInput.value.trim();
           const messageVal = messageInput.value.trim();

           if (nameVal === "") {
             nameError.textContent = "Please enter your name.";
             ok = false;
           }

           if (emailVal === "") {
             emailError.textContent = "Please enter your email.";
             ok = false;
           } else if (!isValidEmail(emailVal)) {
             emailError.textContent = "Please enter a valid email address.";
             ok = false;
           }

           if (messageVal === "") {
             messageError.textContent = "Please enter a message.";
             ok = false;
           }

           if (!ok) return;

           const contactObj = {
             name: nameVal,
             email: emailVal,
             phone: phoneInput.value.trim(),
             message: messageVal,
             customRequest: customCheckbox.checked,
             submittedAt: new Date().toISOString()
           };

           saveContactToLocalStorage(contactObj);

           alert(`Thank you for your message, ${nameVal}!`);
           form.reset();
         });
       });// -------------------------
          // CUSTOM TRAINING FORM (sessionStorage draft)
          // -------------------------
          const CUSTOM_DRAFT_KEY = "abc_custom_draft";

          function getSelectedLevel() {
            const radios = document.querySelectorAll('input[name="level"]');
            for (const r of radios) {
              if (r.checked) return r.value;
            }
            return "";
          }

          function setSelectedLevel(value) {
            const radios = document.querySelectorAll('input[name="level"]');
            radios.forEach(r => r.checked = (r.value === value));
          }

          function saveCustomDraft() {
            const form = document.getElementById("customForm");
            if (!form) return;

            const draft = {
              goal: document.getElementById("goal").value,
              level: getSelectedLevel(),
              days: document.getElementById("days").value,
              style_strength: document.getElementById("style_strength").checked,
              style_hiit: document.getElementById("style_hiit").checked,
              style_yoga: document.getElementById("style_yoga").checked,
              style_cardio: document.getElementById("style_cardio").checked,
              limitations: document.getElementById("limitations").value,
              notes: document.getElementById("notes").value
            };

            sessionStorage.setItem(CUSTOM_DRAFT_KEY, JSON.stringify(draft));
          }

          function loadCustomDraft() {
            const raw = sessionStorage.getItem(CUSTOM_DRAFT_KEY);
            if (!raw) return;

            const draft = JSON.parse(raw);

            document.getElementById("goal").value = draft.goal || "";
            setSelectedLevel(draft.level || "");
            document.getElementById("days").value = draft.days || "";

            document.getElementById("style_strength").checked = !!draft.style_strength;
            document.getElementById("style_hiit").checked = !!draft.style_hiit;
            document.getElementById("style_yoga").checked = !!draft.style_yoga;
            document.getElementById("style_cardio").checked = !!draft.style_cardio;

            document.getElementById("limitations").value = draft.limitations || "";
            document.getElementById("notes").value = draft.notes || "";
          }

          document.addEventListener("DOMContentLoaded", () => {
            const form = document.getElementById("customForm");
            if (!form) return; // only run on Custom page

            const goalError = document.getElementById("goalError");
            const levelError = document.getElementById("levelError");
            const daysError = document.getElementById("daysError");
            const notesError = document.getElementById("notesError");

            function clearCustomErrors() {
              goalError.textContent = "";
              levelError.textContent = "";
              daysError.textContent = "";
              notesError.textContent = "";
            }

            // Load draft when page opens
            loadCustomDraft();

            // Auto-save draft while typing/changing fields
            form.addEventListener("input", saveCustomDraft);
            form.addEventListener("change", saveCustomDraft);

            // Clear button
            document.getElementById("clearCustomBtn").addEventListener("click", () => {
              form.reset();
              clearCustomErrors();
              sessionStorage.removeItem(CUSTOM_DRAFT_KEY);
              alert("Custom training form cleared!");
            });

            // Submit button (simple validation)
            form.addEventListener("submit", (e) => {
              e.preventDefault();
              clearCustomErrors();

              const goal = document.getElementById("goal").value.trim();
              const level = getSelectedLevel();
              const days = document.getElementById("days").value.trim();
              const notes = document.getElementById("notes").value.trim();

              let ok = true;

              if (goal === "") {
                goalError.textContent = "Please select a goal.";
                ok = false;
              }
              if (level === "") {
                levelError.textContent = "Please select a fitness level.";
                ok = false;
              }
              const daysNum = Number(days);
              if (!days || Number.isNaN(daysNum) || daysNum < 1 || daysNum > 7) {
                daysError.textContent = "Please enter days between 1 and 7.";
                ok = false;
              }
              if (notes === "") {
                notesError.textContent = "Please add notes about your request.";
                ok = false;
              }

              if (!ok) return;

              alert("Thank you! Your custom training request has been submitted.");
              sessionStorage.removeItem(CUSTOM_DRAFT_KEY);
              form.reset();
            });
          });