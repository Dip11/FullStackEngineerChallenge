"""initial_database_fixes

Revision ID: fcbb3f999dea
Revises: ae255c2cc96c
Create Date: 2020-06-13 00:19:54.085672

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fcbb3f999dea'
down_revision = 'ae255c2cc96c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('employee_to_reviews', sa.Column('details', sa.String(length=255), nullable=True))
    op.add_column('employee_to_reviews', sa.Column('performance_phrase_id', sa.Integer(), nullable=True))
    op.add_column('employee_to_reviews', sa.Column('star', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'employee_to_reviews', 'performance_phrases', ['performance_phrase_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'employee_to_reviews', type_='foreignkey')
    op.drop_column('employee_to_reviews', 'star')
    op.drop_column('employee_to_reviews', 'performance_phrase_id')
    op.drop_column('employee_to_reviews', 'details')
    # ### end Alembic commands ###