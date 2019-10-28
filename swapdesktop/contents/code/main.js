/*
*   Copyright (c) 2019 Daniël Cox <danielcox16@gmail.com>
*
*   This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU Lesser General Public License as published by
*   the Free Software Foundation; either version 3.0 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*/

function swapDesktop(n) {
    /* n is the relative desktop number to swap to */
    var newdesktop = workspace.currentDesktop + n;              /* Desktop index of desktop to swap to */
    
    if (newdesktop >= 1 && newdesktop <= workspace.desktops) {
        workspace.clientList().forEach(                         /* Loop over all windows */
            function(w, i) {
                
                if (w.desktop == workspace.currentDesktop) {    /* If on current */
                    w.desktop = newdesktop;                     /* Swap window to new */
                    
                } else if (w.desktop == newdesktop) {           /* If on new */
                    w.desktop = workspace.currentDesktop;       /* Swap window to current */
                }
                
            }
        );
        workspace.currentDesktop = newdesktop;
        
    } else if (newdesktop == 0) {
        workspace.desktops++;                                   /* Add extra desktop */
        
        workspace.clientList().forEach(
            function(w, i) {
                
                if (w.desktop > 1) {
                    w.desktop++;                                /* Move all windows forward except from first first desktop */
                }
                
            }
        );
        
    } else if (newdesktop == workspace.desktops + 1) {
        workspace.desktops++;                                   /* Add extra desktop */
        
        workspace.clientList().forEach(
            function(w, i) {
                
                if (w.desktop == workspace.currentDesktop) {
                    w.desktop = newdesktop;                     /* Move windows from current desktop to new one */
                }
                
            }
        );
        workspace.currentDesktop = newdesktop;
    }
}


if (registerShortcut) {                                         /* Check if the register function actually exists */
    
    registerShortcut("Swap with Next Desktop",                  /* Register shortcut for 'swap with next desktop' */
                          "SWAP DESKTOP: Swap current desktop with next one.",
                          "Meta+Shift+Alt+Right",
                          function() {swapDesktop(1);});
    
    registerShortcut("Swap with Previous Desktop",              /* Register shortcut for 'swap with previous desktop' */
                          "SWAP DESKTOP: Swap current desktop with previous one.",
                          "Meta+Shift+Alt+Left",
                          function() {swapDesktop(-1);});

    registerShortcut("Swap with Above Desktop",                 /* Register shortcut for 'swap with above desktop' */
                          "SWAP DESKTOP: Swap current desktop with one above.",
                          "Meta+Shift+Alt+Up",
                          function() {swapDesktop(-workspace.desktopGridWidth);});
    
    registerShortcut("Swap with Below Desktop",                 /* Register shortcut for 'swap with below desktop' */
                          "SWAP DESKTOP: Swap current desktop with one below.",
                          "Meta+Shift+Alt+Down",
                          function() {swapDesktop(workspace.desktopGridWidth);});
}
