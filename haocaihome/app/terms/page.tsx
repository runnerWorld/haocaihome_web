import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '服务条款 / Terms of Service | 彩虹奥秘 Rainbow Arcana',
  description: 'Read Rainbow Arcana terms for iOS and Android — your rights and obligations.',
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-3">
    <h2 className="text-xl font-semibold text-arcana-cream">{title}</h2>
    <div className="space-y-2 text-arcana-gray text-sm leading-relaxed">{children}</div>
  </section>
);

type BilingualText = { zh: string; en: string };

const BilingualList: React.FC<{ items: BilingualText[] }> = ({ items }) => (
  <ul className="list-disc list-inside space-y-2 text-arcana-gray text-sm leading-relaxed">
    {items.map((item) => (
      <li key={item.zh} className="space-y-1">
        <p>{item.zh}</p>
        <p className="opacity-80">{item.en}</p>
      </li>
    ))}
  </ul>
);

const BilingualBlock: React.FC<BilingualText> = ({ zh, en }) => (
  <div className="space-y-1 text-arcana-gray text-sm leading-relaxed">
    <p>{zh}</p>
    <p className="opacity-80">{en}</p>
  </div>
);

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-arcana-charcoal text-arcana-cream grain-overlay px-6 py-12 md:py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-arcana-gold">Terms of Service</p>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight">服务条款 / Terms of Service</h1>
          <div className="space-y-1 text-arcana-gray text-sm leading-relaxed">
            <p>生效日期：2026 年 2 月 15 日</p>
            <p className="opacity-80">Effective date: February 15, 2026</p>
          </div>
          <BilingualBlock
            zh="感谢选择「彩虹奥秘」（Rainbow Arcana）。使用我们的 iOS 与 Android 应用即表示您同意本条款。请在下载或使用前仔细阅读。如您不同意，请立即停止使用并卸载应用。"
            en="Thank you for choosing “Rainbow Arcana.” By using our iOS or Android app you agree to these terms. Please read them before downloading or using; if you disagree, stop and uninstall."
          />
        </div>

        <Section title="账户与资格 / Eligibility">
          <BilingualList
            items={[
              {
                zh: '您须年满 13 周岁；如在当地需要更高年龄以签署合同，请确保符合。',
                en: 'You must be at least 13, or older where your locale requires a higher age to enter a contract.',
              },
              {
                zh: '若代表组织使用，您确认已获授权并使组织受本条款约束。',
                en: 'If using on behalf of an organization, you are authorized to bind it to these terms.',
              },
              {
                zh: '我们可因违反条款、滥用或法律要求暂停或终止访问。',
                en: 'We may suspend or terminate access for violations, abuse, or legal requirements.',
              },
            ]}
          />
        </Section>

        <Section title="许可与限制 / License & Restrictions">
          <BilingualList
            items={[
              {
                zh: '我们授予您非独占、不可转让、可撤销的个人使用许可，仅限依照应用商店规则在支持设备上运行。',
                en: 'We grant you a non-exclusive, non-transferable, revocable personal license to run the app on supported devices per store rules.',
              },
              {
                zh: '禁止逆向工程、反编译、试图获取源代码，除非法律明示允许。',
                en: 'No reverse engineering, decompiling, or attempting to obtain source code unless allowed by law.',
              },
              {
                zh: '不得用于非法、侵权、欺诈或可能损害他人、平台或我们的行为。',
                en: 'Do not use the app for unlawful, infringing, fraudulent, or harmful activities.',
              },
              {
                zh: '不得绕过或干扰安全措施、使用自动化脚本进行批量请求。',
                en: 'Do not bypass or interfere with security measures, or use automated scripts for bulk requests.',
              },
            ]}
          />
        </Section>

        <Section title="订阅与付费 / Subscriptions & Billing">
          <BilingualList
            items={[
              {
                zh: '付费功能与订阅通过 Apple App Store 或 Google Play 处理，价格、周期与试用以商店显示为准。',
                en: 'Paid features and subscriptions are processed by Apple App Store or Google Play; prices, terms, and trials follow what the store shows.',
              },
              {
                zh: '续订：除非您在续订日前至少 24 小时取消，订阅会自动续期并按商店规则扣费。',
                en: 'Auto-renewal: unless cancelled at least 24 hours before renewal, subscriptions renew automatically per store rules.',
              },
              {
                zh: '退款：遵循 Apple 与 Google 的平台政策；如有争议，请通过商店申请或联系我们协助。',
                en: 'Refunds: subject to Apple and Google policies; request via the store or contact us for help.',
              },
              {
                zh: '变更：我们可调整价格或功能，并在生效前以应用内通知或商店更新说明提示。',
                en: 'Changes: we may adjust pricing or features and will notify in-app or via store notes before they take effect.',
              },
            ]}
          />
        </Section>

        <Section title="内容与知识产权 / Content & IP">
          <BilingualList
            items={[
              {
                zh: '应用内的文字、插画、动画与代码均受版权和其他知识产权法保护。',
                en: 'Text, illustrations, animations, and code in the app are protected by copyright and other IP laws.',
              },
              {
                zh: '您保留对自创内容（例如反馈文字）的权利，同时授予我们在提供服务、改进与支持中使用的非独占许可。',
                en: 'You retain rights to content you create (e.g., feedback text) while granting us a non-exclusive license to use it for providing, improving, and supporting the service.',
              },
              {
                zh: '未经书面许可，不得复制、分发、改编或创建衍生作品。',
                en: 'You may not copy, distribute, adapt, or create derivative works without written permission.',
              },
            ]}
          />
        </Section>

        <Section title="隐私与数据 / Privacy">
          <BilingualBlock
            zh="您的个人信息处理受《隐私政策》约束。使用本应用即表示您同意按照隐私政策收集与使用信息。"
            en="Your personal information is governed by the Privacy Policy. Using the app means you consent to the collection and use described there."
          />
        </Section>

        <Section title="第三方服务 / Third-Party Services">
          <BilingualBlock
            zh="应用可能依赖天气、分析、推送通知等第三方服务。我们不对第三方内容或服务负责，使用前请查阅其条款与隐私政策。"
            en="The app may rely on third-party services (weather, analytics, push). We are not responsible for their content or practices; review their terms and privacy policies."
          />
        </Section>

        <Section title="免责声明 / Disclaimers">
          <BilingualList
            items={[
              {
                zh: '本应用提供的塔罗与提醒仅供自我反思与娱乐，不构成医疗、法律、财务或其他专业建议。',
                en: 'Tarot and reminders are for self-reflection and entertainment only; they are not medical, legal, financial, or other professional advice.',
              },
              {
                zh: '服务按“现状”提供，我们不保证不中断、无错误或完全安全。法律允许范围内，我们否认所有默示保证。',
                en: 'Service is provided “as is”; we do not guarantee uninterrupted, error-free, or fully secure operation. To the extent allowed by law, all implied warranties are disclaimed.',
              },
            ]}
          />
        </Section>

        <Section title="责任限制 / Limitation of Liability">
          <BilingualBlock
            zh="在适用法律允许的最大范围内，我们对间接、附带、后果性或惩罚性损害不承担责任。对直接损失的总责任不超过您在争议发生前 12 个月内为服务实际支付的费用（若有）。某些司法辖区不允许排除或限制，条款可能不适用于您。"
            en="To the maximum extent allowed by law, we are not liable for indirect, incidental, consequential, or punitive damages. Our total liability for direct damages is capped at the fees you paid for the service in the 12 months before the claim (if any). Some jurisdictions do not allow these exclusions, so they may not apply to you."
          />
        </Section>

        <Section title="终止 / Termination">
          <BilingualBlock
            zh="您可随时通过卸载应用终止使用。若您违反条款或法律，我们可暂停或终止访问。终止后，依据法律与政策保留必要记录，其余将按隐私政策处理。"
            en="You may end use anytime by uninstalling. We may suspend or terminate access for violations or legal reasons. After termination, necessary records may be kept as required; other data is handled per the Privacy Policy."
          />
        </Section>

        <Section title="适用法律与争议解决 / Governing Law & Disputes">
          <BilingualBlock
            zh="在不与强制性消费者保护法抵触的范围内，本条款受您居住地适用的法律管辖。争议应首先友好协商解决；若无法解决，可提交至有管辖权的法院。部分地区可适用强制仲裁或小额诉讼法院规定，届时以当地法律为准。"
            en="Subject to mandatory consumer protection laws, these terms are governed by the laws of your place of residence. Disputes should first be resolved amicably; if unresolved, they may be brought to a court with jurisdiction. In some regions, mandatory arbitration or small-claims rules may apply as local law requires."
          />
        </Section>

        <Section title="条款更新 / Changes">
          <BilingualBlock
            zh="我们可能更新本条款。重大变更将在应用内提示新的生效日期。继续使用即表示接受更新后的条款。"
            en="We may update these terms. Significant changes will be noted in-app with the new effective date. Continuing to use the app means you accept the updated terms."
          />
        </Section>

        <Section title="联系我们 / Contact">
          <BilingualBlock
            zh="如对条款有疑问或需支持，请联系：邮箱 support@haocaihome.com"
            en="For questions or support about these terms, contact us at: support@haocaihome.com"
          />
        </Section>
      </div>
    </div>
  );
}
