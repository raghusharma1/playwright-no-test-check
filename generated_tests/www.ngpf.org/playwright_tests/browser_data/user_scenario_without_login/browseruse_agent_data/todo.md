
# Scenario: Get Started Now (Bank Sim)

## Steps:
- [ ] Click 'Get Started Now' button [UI_FLOW_CHANGE]
- [ ] Click dialog 'Welcome dialog' [UI_FLOW_CHANGE]
- [ ] Click button 'Ok' [UI_FLOW_CHANGE]
- [ ] Click menu item 'Accounts' [UI_FLOW_CHANGE]
- [ ] Click menu item 'Account Activity' [UI_FLOW_CHANGE]
- [ ] Click bar 'Saving' [UI_FLOW_CHANGE]
- [ ] Verify ID '1100001' is present [UI_FLOW_CHANGE]

## Protocols:
- UI flow changes: Retry 3x; if fails, mark edge invalid in nav graph, restart from homepage
- Each action: Capture selector before interacting; never batch inputs
- Navigation graph file will be maintained throughout scenario

