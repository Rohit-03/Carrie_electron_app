const { useState, useEffect, useRef } = React;

// Tesla Chat Component
function TeslaChat() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi Rohit! Based on your meeting with your manager, it looks like you will need to make some updates to the presentation.",
            sender: 'assistant',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showTasks, setShowTasks] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleSendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        const newMessage = {
            id: messages.length + 1,
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputText('');
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "I understand. Let me help you with those presentation updates. What specific changes did your manager request?",
                "That sounds important. Can you tell me more about what needs to be updated in the presentation?",
                "I'm here to help! What aspects of the Tesla earnings presentation need revision?",
                "Got it. Let's work on those updates together. What feedback did you receive about the presentation?"
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            const aiResponse = {
                id: messages.length + 2,
                text: randomResponse,
                sender: 'assistant',
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
        // Auto-resize textarea
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    };

    return React.createElement('div', { 
        className: 'tesla-chat-wrapper',
        style: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#fcfbf7'
        }
    }, [
        // Header with toggle button
        React.createElement('div', {
            className: 'tesla-chat-header',
            key: 'header',
            style: {
                background: '#fff',
                padding: '16px 20px',
                borderBottom: '1px solid #ececec',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }
        }, [
            // Toggle button on the left
            React.createElement('button', {
                className: `tesla-task-toggle ${showTasks ? 'active' : ''}`,
                onClick: () => setShowTasks(!showTasks),
                key: 'toggle-button',
                style: {
                    background: 'none',
                    border: '1px solid #ececec',
                    borderRadius: '6px',
                    padding: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    color: showTasks ? '#37352f' : '#888',
                    fontSize: '16px',
                    transition: 'all 0.2s ease'
                }
            }, showTasks ? '✓' : '☰'),
            React.createElement('h2', {
                style: {
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#37352f'
                }
            }, 'Tesla Project Chat')
        ]),

        // Main content area
        React.createElement('div', {
            style: {
                flex: 1,
                display: 'flex',
                overflow: 'hidden'
            },
            key: 'main-content'
        }, [
            // Chat container
            React.createElement('div', { 
                className: 'tesla-chat-container',
                style: {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }
            }, [
                React.createElement('div', { className: 'tesla-chat-messages', key: 'messages' }, [
                    ...messages.map((message) =>
                        React.createElement('div', { 
                            key: message.id, 
                            className: `tesla-chat-message ${message.sender}` 
                        }, [
                            React.createElement('div', { 
                                className: `tesla-chat-bubble ${message.sender}`,
                                key: 'bubble'
                            }, message.text),
                            React.createElement('div', { 
                                className: 'tesla-chat-timestamp',
                                key: 'timestamp'
                            }, formatTime(message.timestamp))
                        ])
                    ),
                    
                    isLoading && React.createElement('div', { className: 'tesla-chat-loading', key: 'loading' },
                        React.createElement('div', { className: 'tesla-chat-bubble assistant' },
                            React.createElement('div', { className: 'tesla-typing-indicator' }, [
                                React.createElement('div', { className: 'tesla-typing-dot', key: 'dot1' }),
                                React.createElement('div', { className: 'tesla-typing-dot', key: 'dot2' }),
                                React.createElement('div', { className: 'tesla-typing-dot', key: 'dot3' })
                            ])
                        )
                    ),
                    
                    React.createElement('div', { ref: messagesEndRef, key: 'messages-end' })
                ]),

                React.createElement('div', { className: 'tesla-chat-input-container', key: 'input-container' },
                    React.createElement('div', { className: 'tesla-chat-input-box' }, [
                        React.createElement('textarea', {
                            ref: inputRef,
                            value: inputText,
                            onChange: handleInputChange,
                            onKeyPress: handleKeyPress,
                            placeholder: 'Message about your Tesla project...',
                            className: 'tesla-chat-input',
                            rows: 1,
                            key: 'textarea'
                        }),
                        React.createElement('button', {
                            onClick: handleSendMessage,
                            disabled: !inputText.trim() || isLoading,
                            className: `tesla-chat-send ${inputText.trim() && !isLoading ? 'active' : ''}`,
                            key: 'send-button'
                        }, '↑')
                    ])
                )
            ]),

            // Task panel (conditionally rendered)
            showTasks && React.createElement('div', {
                className: 'tesla-task-panel',
                key: 'task-panel',
                style: {
                    width: '300px',
                    background: '#fff',
                    borderLeft: '1px solid #ececec',
                    padding: '20px',
                    overflow: 'auto'
                }
            }, [
                React.createElement('h3', {
                    style: {
                        margin: '0 0 16px 0',
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#37352f'
                    }
                }, 'Tasks'),
                React.createElement('p', {
                    style: {
                        color: '#888',
                        fontSize: '14px',
                        margin: '0'
                    }
                }, 'Task view will be implemented here')
            ])
        ])
    ]);
}

// Export for use in other files
window.TeslaChat = TeslaChat; 