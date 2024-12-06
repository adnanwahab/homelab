{ 
    const client = new Anthropic.Anthropic();
    new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
    
    const stream = await client.messages.create({
      max_tokens: 1024,
      messages: [{ role: 'user', content: 'Hello, Claude' }],
      model: 'claude-3-opus-20240229',
      stream: true,
    });
    for await (const messageStreamEvent of stream) {
      console.log(messageStreamEvent.type);
    }
    }