# 💕 Valentine Forever - Customization Guide

## For Kanishk & Raghavi

This document will help you customize all the memories and content in your Valentine's website.

---

## 📁 Main File to Edit

All your memories and content are in one file:
```
src/data/loveData.js
```

---

## ❓ Questions to Answer for Each Section

### 1. TIMELINE - Your Love Story

Answer these questions to fill in your timeline:

#### Event 1: The Day You Met
- **Date:** June 11, 2020 (already set)
- **What happened?** How did you two meet?
- **Where were you?**
- **What was your first impression of Raghavi?**
- **How did you feel?**

#### Event 2: First Conversation
- **When did you first really talk?**
- **What did you talk about?**
- **What made it special?**

#### Event 3: Getting Closer
- **How did your relationship grow?**
- **What were your favorite things to do together?**
- **Any special memories from this time?**

#### Event 4: Special Moments
- **What's a memorable moment you shared?**
- **Any inside jokes or special things only you two understand?**
- **Late night calls? Special dates?**

#### Event 5: When You Knew She's The One
- **When did you realize you truly love her?**
- **What was happening?**
- **How did it feel?**

#### Event 6: Overcoming Challenges
- **Any tough times you went through together?**
- **How did you support each other?**
- **What made you stronger?**

---

### 2. LOVE LETTER

Questions for your love letter:

- **What do you want to tell Raghavi?**
- **What does she mean to you?**
- **What do you love most about her?**
- **What are your hopes for the future?**
- **Any specific memories you want to mention?**

---

### 3. WHY I LOVE YOU - Card Reasons

Currently you have 10 cards. For each one, answer:

| Card | Front (Short) | Back (Explanation) |
|------|---------------|-------------------|
| 1 | Her Smile | Why her smile is special to you |
| 2 | Her Heart | How kind/caring she is |
| 3 | Her Laugh | What you love about it |
| 4 | Her Strength | How strong she is |
| 5 | Her Eyes | What you see in them |
| 6 | Her Voice | Why you love hearing her |
| 7 | Her Support | How she supports you |
| 8 | Her Patience | How patient she is with you |
| 9 | Her Love | How her love makes you feel |
| 10 | Just Her | Why she's special |

**Add more reasons:**
- Her intelligence?
- Her sense of humor?
- Her cooking?
- Her style?
- Her dreams?
- The way she says your name?
- Her hugs?
- Her texts?

---

### 4. GALLERY CAPTIONS

For each gallery image, what caption do you want?

1. _______________
2. _______________
3. _______________
4. _______________
5. _______________
6. _______________
7. _______________
8. _______________

---

### 5. FINAL QUESTION

The final surprise asks: "Raghavi, will you be my Valentine forever?"

**What messages should appear after she clicks YES?**

Current messages:
1. "You said YES!"
2. "My heart is exploding with joy!"
3. "I love you, Raghavi!"
4. "This website ends here..."
5. "But our story never will."
6. "Forever yours, Kanishk ❤️"

Want to change these? Write your own:
1. _______________
2. _______________
3. _______________
4. _______________
5. _______________
6. _______________

---

## 🎨 Animated Images

Currently using romantic GIF images. You can change them to:

### Option A: Keep Current GIFs (Recommended)
The current animated images are romantic and beautiful.

### Option B: Add Your Own GIFs
Find GIFs from:
- https://giphy.com (search "romantic", "love", "couple")
- https://tenor.com

Then replace the URLs in `loveData.js` in the `animatedImages` object.

### Option C: Add Your Real Photos Later
When ready, you can replace GIF URLs with your actual photo paths:
```javascript
image: "/images/your-photo.jpg"
```

---

## 🗓️ Important Dates

Update these in `loveData.js`:

```javascript
// Your anniversary date
export const anniversaryDate = new Date('2020-06-11T00:00:00');

// Valentine's Day countdown
export const countdownDate = new Date('2025-02-14T00:00:00');
```

---

## ✏️ How to Edit

1. Open `src/data/loveData.js`
2. Find the section you want to edit
3. Change the text between the quotes `" "`
4. Save the file
5. Run `npm run dev` to see changes

---

## 📝 Example Edit

**Before:**
```javascript
{
  id: 1,
  title: "The Day We Met",
  date: "June 11, 2020",
  description: "The universe aligned perfectly that day...",
}
```

**After (with your memory):**
```javascript
{
  id: 1,
  title: "The Day We Met",
  date: "June 11, 2020",
  description: "I still remember seeing you for the first time at [place]. You were wearing [description]. The moment our eyes met, I knew my life was about to change forever.",
}
```

---

## 🚀 Deployment

When ready to share with Raghavi:

### Vercel (Recommended - Free)
1. Push code to GitHub
2. Go to vercel.com
3. Import your repository
4. Click Deploy
5. Get your link and share!

### Netlify (Also Free)
1. Push code to GitHub
2. Go to netlify.com
3. Connect repository
4. Deploy
5. Share the link!

---

## 💡 Tips

- Be specific with memories - details make it special
- Use her name "Raghavi" in the text to make it personal
- The love letter should feel like YOU wrote it
- Think about what will make HER cry happy tears

---

## Need Help?

If you want to:
- Add more timeline events
- Add more love reasons
- Change colors or fonts
- Add music

Just ask!

---

**Made with ❤️ for Kanishk & Raghavi**
