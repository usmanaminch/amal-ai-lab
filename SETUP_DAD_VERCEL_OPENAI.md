# Dad Setup — Vercel + OpenAI

You already did the main Dad step: adding `OPENAI_API_KEY` to the Vercel project.

## What is left?

Only these steps:

1. Add these files to the repo.
2. Commit and push to GitHub.
3. Let Vercel redeploy.
4. Test the Plant Care Helper page.

## Required Vercel Environment Variable

In Vercel project `amal-ai-lab`, confirm this exists:

```text
OPENAI_API_KEY
```

It should be added for Production. Preview and Development are optional.

## Optional Vercel Environment Variables

These are optional. The code has defaults.

```text
OPENAI_VISION_MODEL=gpt-4.1-mini
OPENAI_IMAGE_MODEL=gpt-image-1
```

## How this works

The website calls:

```text
/api/analyze-plant
```

That Vercel serverless function:
- receives the plant photo
- sends it to OpenAI for vision analysis
- gets exactly 3 advice sentences
- creates 5 image prompts
- generates Week 1–Week 5 images
- sends everything back to the website

## Why this is safe

The browser never sees the OpenAI API key.
Only the Vercel backend function uses the key through:

```js
process.env.OPENAI_API_KEY
```

## Test URL after deploy

```text
https://amal-ai-lab.vercel.app/projects/plant-care-helper-ai/
```

Upload a plant photo and click the AI button.

## Expected timing

The first request can take 30–90 seconds because it does:
- one vision/advice call
- five image-generation calls
