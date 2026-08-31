const code = require('fs').readFileSync('src/App.tsx', 'utf-8');
const replacement = `
          let mostVisibleId = '';
          let minDistance = Infinity;

          sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const triggerLine = 300; 

            if (rect.top <= triggerLine && rect.bottom >= triggerLine) {
              mostVisibleId = section.id;
            } else if (rect.top > triggerLine) {
              const distance = rect.top - triggerLine;
              if (distance < minDistance && !mostVisibleId) {
                minDistance = distance;
                // Don't set mostVisibleId here unless we really want it to snap to the next one
              }
            }
          });

          // A better approach: find the last section whose top is above the trigger line
          let activeSection = sections[0]?.id || 'products-top';
          for (let i = 0; i < sections.length; i++) {
            if (sections[i].getBoundingClientRect().top <= 300) {
              activeSection = sections[i].id;
            }
          }
          mostVisibleId = activeSection;
`;
