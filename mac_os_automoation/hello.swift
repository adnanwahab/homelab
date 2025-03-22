import Cocoa
import Carbon

class KeyReplacer: NSObject {
    private var fileContent: String = ""
    private var fileContentChars: [Character] = []
    private var currentIndex = 0
    private var eventTap: CFMachPort?
    
    func start(filePath: String) {
        // Load the file content
        do {
            fileContent = try String(contentsOfFile: filePath, encoding: .utf8)
            fileContentChars = Array(fileContent)
            print("Loaded \(fileContentChars.count) characters from file")
        } catch {
            print("Error loading file: \(error)")
            return
        }
        
        // Create event tap to intercept keystrokes
        let eventMask = CGEventMask(1 << CGEventType.keyDown.rawValue)
        
        guard let tap = CGEvent.tapCreate(
            tap: .cgSessionEventTap,
            place: .headInsertEventTap,
            options: .defaultTap,
            eventsOfInterest: eventMask,
            callback: { (proxy, type, event, refcon) -> Unmanaged<CGEvent>? in
                return Unmanaged.passUnretained(KeyReplacer.handleEvent(proxy: proxy, type: type, event: event, refcon: refcon))
            },
            userInfo: UnsafeMutableRawPointer(Unmanaged.passUnretained(self).toOpaque())
        ) else {
            print("Failed to create event tap")
            return
        }
        
        eventTap = tap
        
        // Add tap to the run loop
        let runLoopSource = CFMachPortCreateRunLoopSource(kCFAllocatorDefault, tap, 0)
        CFRunLoopAddSource(CFRunLoopGetCurrent(), runLoopSource, .commonModes)
        CGEvent.tapEnable(tap: tap, enable: true)
        
        print("Key replacer started. Press any key to output text from file. Press Esc to quit.")
    }
    
    func stop() {
        if let tap = eventTap {
            CGEvent.tapEnable(tap: tap, enable: false)
            eventTap = nil
        }
    }
    
    static func handleEvent(proxy: CGEventTapProxy, type: CGEventType, event: CGEvent, refcon: UnsafeMutableRawPointer?) -> CGEvent {
        let keyReplacer = Unmanaged<KeyReplacer>.fromOpaque(refcon!).takeUnretainedValue()
        
        // Get the key code from the event
        let keyCode = event.getIntegerValueField(.keyboardEventKeycode)
        
        // Check for Escape key (53) to exit
        if keyCode == 53 {
            print("Escape pressed. Exiting...")
            exit(0)
        }
        
        // Replace the keystroke with a chunk from the file
        let replacementChars = keyReplacer.getNextChunk()
        if !replacementChars.isEmpty {
            // Delete the original keystroke
            event.setType(.keyUp)
            
            // Post events for the replacement text
            DispatchQueue.main.async {
                keyReplacer.simulateTyping(text: replacementChars)
            }
        }
        
        // Return a null event to consume the original keystroke
        return Unmanaged.passUnretained(CGEvent()).takeUnretainedValue()
    }
    
    private func getNextChunk() -> String {
        // Get a chunk of text (you can adjust the chunk size)
        let chunkSize = 5
        var chunk = ""
        
        for _ in 0..<chunkSize {
            if currentIndex >= fileContentChars.count {
                currentIndex = 0 // Loop back to start of file
            }
            
            chunk.append(fileContentChars[currentIndex])
            currentIndex += 1
        }
        
        return chunk
    }
    
    private func simulateTyping(text: String) {
        let source = CGEventSource(stateID: .hidSystemState)
        
        for char in text {
            // Convert character to key code and modifiers
            // This is a simplified version; a full implementation would need a character-to-keycode mapping
            let keyCode: CGKeyCode = 0 // 'a' key for example
            
            // Create down and up events
            if let keyDownEvent = CGEvent(keyboardEventSource: source, virtualKey: keyCode, keyDown: true) {
                keyDownEvent.setStringRepresentation(String(char))
                keyDownEvent.post(tap: .cgAnnotatedSessionEventTap)
            }
            
            if let keyUpEvent = CGEvent(keyboardEventSource: source, virtualKey: keyCode, keyDown: false) {
                keyUpEvent.post(tap: .cgAnnotatedSessionEventTap)
            }
            
            // Small delay between keystrokes
            usleep(10000) // 10ms
        }
    }
}

// Main application
@main
struct KeyReplacerApp {
    static func main() {
        let arguments = CommandLine.arguments
        
        guard arguments.count > 1 else {
            print("Usage: KeyReplacer <path/to/text/file>")
            exit(1)
        }
        
        let filePath = arguments[1]
        
        // Request accessibility permissions
        let options: NSDictionary = [kAXTrustedCheckOptionPrompt.takeUnretainedValue() as NSString: true]
        guard AXIsProcessTrustedWithOptions(options) else {
            print("Please grant accessibility permissions in System Preferences > Security & Privacy > Privacy > Accessibility")
            exit(1)
        }
        
        let keyReplacer = KeyReplacer()
        keyReplacer.start(filePath: filePath)
        
        // Run the app
        RunLoop.current.run()
    }
}